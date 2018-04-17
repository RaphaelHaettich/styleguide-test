<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>

    <xsl:param name="additionalClass"/>
    <xsl:param name="submit"/>

    <xsl:template match="*">
        <button>
            <xsl:attribute name="class">cp-button <xsl:value-of select="$additionalClass"/></xsl:attribute>
            <xsl:if test="$submit">
                <xsl:attribute name="type">submit</xsl:attribute>
            </xsl:if>
            Button Element
        </button>
    </xsl:template>
</xsl:stylesheet>
