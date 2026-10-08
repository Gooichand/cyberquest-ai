import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type Role = "student" | "company" | "admin";

function context(role: Role | null): TrpcContext {
  return {
    user: role
      ? {
          id: 1,
          openId: `${role}-test`,
          email: `${role}@example.com`,
          name: role,
          loginMethod: "test",
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        }
      : null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("server role gates", () => {
  it("rejects an unauthenticated workspace request", async () => {
    const caller = appRouter.createCaller(context(null));
    await expect(caller.workspace.session()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("allows a signed-in student to read their session role", async () => {
    const caller = appRouter.createCaller(context("student"));
    await expect(caller.workspace.session()).resolves.toMatchObject({ role: "student" });
  });

  it("rejects a company account from the admin policy surface", async () => {
    const caller = appRouter.createCaller(context("company"));
    await expect(caller.admin.policy()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows only an admin account to read the policy surface", async () => {
    const caller = appRouter.createCaller(context("admin"));
    await expect(caller.admin.policy()).resolves.toMatchObject({
      role: "admin",
      safety: "human_approval_required",
      automaticActionTaken: false,
    });
  });
});
