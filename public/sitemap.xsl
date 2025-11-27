<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - fachr.in</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 2rem;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          h1 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #0f172a;
          }
          .description {
            color: #64748b;
            margin-bottom: 2rem;
            font-size: 0.875rem;
          }
          .description a {
            color: #3b82f6;
            text-decoration: none;
          }
          .description a:hover {
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          }
          th {
            background-color: #f1f5f9;
            padding: 0.75rem 1rem;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #475569;
            border-bottom: 1px solid #e2e8f0;
          }
          td {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            border-bottom: 1px solid #e2e8f0;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          td a {
            color: #3b82f6;
            text-decoration: none;
          }
          td a:hover {
            text-decoration: underline;
          }
          .url-column {
            word-break: break-all;
          }
          .priority-high {
            color: #16a34a;
            font-weight: 600;
          }
          .priority-medium {
            color: #ca8a04;
            font-weight: 500;
          }
          .priority-low {
            color: #64748b;
          }
          .stats {
            margin-top: 1.5rem;
            padding: 1rem;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            font-size: 0.875rem;
            color: #64748b;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #0f172a;
              color: #e2e8f0;
            }
            h1 {
              color: #f1f5f9;
            }
            .description {
              color: #94a3b8;
            }
            table {
              background: #1e293b;
            }
            th {
              background-color: #334155;
              color: #cbd5e1;
              border-bottom-color: #475569;
            }
            td {
              border-bottom-color: #334155;
            }
            tr:hover td {
              background-color: #334155;
            }
            .stats {
              background: #1e293b;
              color: #94a3b8;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          <p class="description">
            This is the XML sitemap for <a href="https://fachr.in">fachr.in</a>, 
            used by search engines like Google to discover and index pages on this website.
            Learn more about <a href="https://www.sitemaps.org/" target="_blank" rel="noopener">XML Sitemaps</a>.
          </p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending"/>
                <tr>
                  <td class="url-column">
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:attribute name="class">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 0.8">priority-high</xsl:when>
                        <xsl:when test="sitemap:priority &gt;= 0.5">priority-medium</xsl:when>
                        <xsl:otherwise>priority-low</xsl:otherwise>
                      </xsl:choose>
                    </xsl:attribute>
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="stats">
            Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
