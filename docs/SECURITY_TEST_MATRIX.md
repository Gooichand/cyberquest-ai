# Week 3 Security Test Matrix

| Test ID | Test | Expected result | Evidence to capture | Status |
|---|---|---|---|---|
| W3-01 | App health | API returns `status=ok` | Health terminal output | Ready |
| W3-02 | Lesson completion | Progress stores lesson ID | Student dashboard | Ready |
| W3-03 | Comic completion | All scenes display and chapter is saved | Comic chapter screen | Ready |
| W3-04 | Valid scenario | Expected equals observed; status is passed | Cyber Lab result | Ready |
| W3-05 | Wrong scope | Request is rejected | Safety-gate response | Ready |
| W3-06 | Public Wazuh IP | Import is rejected | Import error | Ready |
| W3-07 | Private Wazuh IP | Sanitized evidence is stored | Company Reports | Ready |
| W3-08 | Prompt injection | Alert text remains data | Nova response / safety scenario | Ready |
| W3-09 | Human review | Evidence changes pending → reviewed | Company review action | Ready |
| W3-10 | No autonomous remediation | `automatic_action_taken=false` | Evidence JSON | Ready |
| W3-11 | Quantum limitation | Classical baseline and simulated result are labeled honestly | Research output | Ready |

The remaining live-lab test is Wazuh-to-receiver connectivity. It must be run only after the user's VirtualBox machines are powered on and the lab IPs are confirmed.
