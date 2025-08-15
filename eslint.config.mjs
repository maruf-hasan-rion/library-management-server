// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  //   tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules : {
        "no-console" : "warn",
         "react/react-in-jsx-scope": "off",
        '@typescript-eslint/no-explicit-any': 'off',
    }
  }
);
