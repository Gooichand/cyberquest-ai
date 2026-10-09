import { describe, expect, it } from "vitest";
import { comics, lessons, scenarios } from "./curriculum";

describe("CyberQuest curriculum catalog", () => {
  it("contains the requested learning depth", () => {
    expect(lessons).toHaveLength(30);
    expect(new Set(lessons.map(lesson => lesson.id)).size).toBe(30);
    expect(lessons.every(lesson => lesson.options.length === 3 && lesson.options.includes(lesson.answer))).toBe(true);
    expect(lessons.every(lesson => lesson.screens.length === 20)).toBe(true);
    expect(new Set(lessons.map(lesson => lesson.quizMode)).size).toBeGreaterThanOrEqual(6);
  });

  it("contains 50 comics with fifteen navigable scenes each", () => {
    expect(comics).toHaveLength(50);
    expect(comics.filter(comic => comic.panels.length > 0)).toHaveLength(50);
    expect(comics.every(comic => comic.panels.length === 15)).toBe(true);
    expect(new Set(comics.map(comic => comic.id)).size).toBe(50);
  });

  it("keeps every lab deterministic and non-destructive", () => {
    expect(scenarios).toHaveLength(20);
    expect(new Set(scenarios.map(scenario => scenario.id)).size).toBe(20);
    expect(scenarios.every(scenario => scenario.tool.endsWith("_v1"))).toBe(true);
    expect(scenarios.every(scenario => scenario.objectives.length === 3 && scenario.hints.length === 3)).toBe(true);
    expect(scenarios.every(scenario => !/autonomous remediation|execute an attack|changes the endpoint/i.test(`${scenario.description} ${scenario.result}`))).toBe(true);
  });
});
