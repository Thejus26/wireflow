name: Bug report
about: Report a reproducible issue in Wireflow
title: ""
labels: ["bug"]
assignees: []
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report a bug in Wireflow.
        Please fill out the details below as clearly as possible.

  - type: textarea
    id: summary
    attributes:
      label: Bug summary
      description: What happened?
      placeholder: Describe the issue in one or two paragraphs.
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      placeholder: |
        1. Open the app
        2. Create a component
        3. Connect pins
        4. Observe the issue
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
      placeholder: What did you expect to happen?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual behavior
      placeholder: What happened instead?
    validations:
      required: true

  - type: textarea
    id: environment
    attributes:
      label: Environment
      placeholder: |
        - OS:
        - Browser:
        - Node version:
        - Package manager:
        - App version / commit:
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots or recordings
      description: Attach any relevant images or videos.
      placeholder: Drag and drop files here or paste screenshots.
