name: Feature request
about: Suggest an idea or enhancement for Wireflow
title: ""
labels: ["enhancement"]
assignees: []
body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a feature. Please share as much context as possible so the idea is easy to evaluate.

  - type: textarea
    id: problem
    attributes:
      label: Problem to solve
      description: What use case or pain point does this address?
      placeholder: Describe the workflow that is difficult or missing today.
    validations:
      required: true

  - type: textarea
    id: proposal
    attributes:
      label: Proposed solution
      description: Describe the feature or improvement you want.
      placeholder: What would this look like in practice?
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives considered
      placeholder: Have you considered other approaches or workarounds?

  - type: textarea
    id: impact
    attributes:
      label: Why it matters
      placeholder: Who would benefit and why is this important?
