<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="*">
        <button class="cp-button {{{{modifier_class}}}}">Button Element</button>
    </xsl:template>
</xsl:stylesheet>
