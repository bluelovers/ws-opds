"use strict";
/**
 * Created by user on 2019/3/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.REL_BASE_URL = 'http://opds-spec.org/';
var EnumEntryContent;
(function (EnumEntryContent) {
    EnumEntryContent["TEXT"] = "text";
    EnumEntryContent["XHTML"] = "xhtml";
})(EnumEntryContent = exports.EnumEntryContent || (exports.EnumEntryContent = {}));
var EnumLinkRel;
(function (EnumLinkRel) {
    /**
     * 一般的獲取刊物
     **/
    EnumLinkRel["ACQUISITION"] = "http://opds-spec.org/acquisition";
    /**
     * 無條件獲取刊物
     **/
    EnumLinkRel["ACQUISITION_OPEN_ACCESS"] = "http://opds-spec.org/acquisition/open-access";
    /**
     * 借閱刊物
     **/
    EnumLinkRel["ACQUISITION_BORROW"] = "http://opds-spec.org/acquisition/borrow";
    /**
     * 購買刊物
     **/
    EnumLinkRel["ACQUISITION_BUY"] = "http://opds-spec.org/acquisition/buy";
    /**
     * 試閱刊物
     **/
    EnumLinkRel["ACQUISITION_SAMPLE"] = "http://opds-spec.org/acquisition/sample";
    /**
     * 訂閱刊物
     **/
    EnumLinkRel["ACQUISITION_SUBSCRIBE"] = "http://opds-spec.org/acquisition/subscribe";
    /**
     * 刊物圖片(封面)
     **/
    EnumLinkRel["IMAGE"] = "http://opds-spec.org/image";
    /**
     * 刊物圖片之縮圖
     **/
    EnumLinkRel["IMAGE_THUMBNAIL"] = "http://opds-spec.org/image/thumbnail";
    /**
     * 目前資源
     *
     * <link rel="self" title="This Page" type="application/atom+xml;profile=opds-catalog" href="/ebooks.opds/"/>
     */
    EnumLinkRel["SELF"] = "self";
    /**
     * 資源由何處提供
     */
    EnumLinkRel["VIA"] = "via";
    /**
     * 相關資源
     */
    EnumLinkRel["ALTERNATE"] = "alternate";
    EnumLinkRel["START"] = "start";
    /**
     * 只使用在<Feed>之<link>
     */
    EnumLinkRel["FACET"] = "http://opds-spec.org/facet";
    EnumLinkRel["ENCLOSURE"] = "enclosure";
    EnumLinkRel["RELATED"] = "related";
    EnumLinkRel["SUBSECTION"] = "http://opds-spec.org/subsection";
    EnumLinkRel["CRAWLABLE"] = "http://opds-spec.org/crawlable";
})(EnumLinkRel = exports.EnumLinkRel || (exports.EnumLinkRel = {}));
Object.keys(EnumLinkRel).forEach(k => {
    let lc = k.toLowerCase();
    if (lc !== k && !(lc in EnumLinkRel)) {
        EnumLinkRel[lc] = EnumLinkRel[k];
    }
});
var EnumMIME;
(function (EnumMIME) {
    EnumMIME["jpg"] = "image/jpeg";
    EnumMIME["jpeg"] = "image/jpeg";
    EnumMIME["gif"] = "image/gif";
    EnumMIME["png"] = "image/png";
    EnumMIME["epub"] = "application/epub+zip";
    EnumMIME["opds"] = "application/atom+xml;profile=opds-catalog";
    EnumMIME["pdf"] = "application/pdf";
    EnumMIME["mobi"] = "application/x-mobipocket-ebook";
    EnumMIME["html"] = "text/htm";
    EnumMIME["css"] = "text/css";
    EnumMIME["plain"] = "text/plain";
    EnumMIME["txt"] = "text/plain";
    EnumMIME["atom"] = "application/atom+xml";
    /**
     * OPDS Catalog Entry Document
     */
    EnumMIME["OPDS_CATALOG_ENTRY_DOCUMENT"] = "application/atom+xml;type=entry;profile=opds-catalog";
    /**
     * OPDS Catalog Feed Document
     */
    EnumMIME["OPDS_CATALOG_FEED_DOCUMENT"] = "application/atom+xml;profile=opds-catalog";
    /**
     * Acquisition Feed
     */
    EnumMIME["ACQUISITION_FEED"] = "application/atom+xml;profile=opds-catalog;kind=acquisition";
    /**
     * Navigation Feed
     */
    EnumMIME["NAVIGATION_FEED"] = "application/atom+xml;profile=opds-catalog;kind=navigation";
})(EnumMIME = exports.EnumMIME || (exports.EnumMIME = {}));
var EnumPriceCurrencyCode;
(function (EnumPriceCurrencyCode) {
    EnumPriceCurrencyCode["TWD"] = "TWD";
    EnumPriceCurrencyCode["USD"] = "USD";
})(EnumPriceCurrencyCode = exports.EnumPriceCurrencyCode || (exports.EnumPriceCurrencyCode = {}));
exports.default = exports;
//# sourceMappingURL=const.js.map