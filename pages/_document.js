import { GOOGLE_TAG_MANAGER_ID } from "@/constants";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/css/style.css" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer',${GOOGLE_TAG_MANAGER_ID});
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </Html>
  );
}
