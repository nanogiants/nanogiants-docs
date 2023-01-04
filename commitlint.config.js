module.exports = {
    rules: {
        "body-leading-blank": [1, "always"],
        "footer-leading-blank": [1, "always"],
        "header-max-length": [2, "always", 100],
        "scope-case": [2, "always", "lower-case"],
        "scope-enum": [
            2,
            "always",
            ["git", "version", "license", "tests", "cicd", "metrics", "deployment", "documentation", "general"]
        ],
        "subject-case": [
            2,
            "never",
            ["sentence-case", "start-case", "pascal-case", "upper-case"],
        ],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never", "."],
        "type-case": [2, "always", "lower-case"],
        "type-empty": [2, "never"],
        "type-enum": [
            2,
            "always",
            ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
        ],
    },
};
