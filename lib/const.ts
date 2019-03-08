/**
 * Created by user on 2019/3/8.
 */

export const REL_BASE_URL = 'http://opds-spec.org/';

export enum EnumEntryContent
{
	TEXT = 'text',
	XHTML = 'xhtml',
}

export enum EnumLinkRel
{
	/**
	 * 一般的獲取刊物
	 **/
	ACQUISITION = "http://opds-spec.org/acquisition",
	/**
	 * 無條件獲取刊物
	 **/
	ACQUISITION_OPEN_ACCESS = "http://opds-spec.org/acquisition/open-access",
	/**
	 * 借閱刊物
	 **/
	ACQUISITION_BORROW = "http://opds-spec.org/acquisition/borrow",
	/**
	 * 購買刊物
	 **/
	ACQUISITION_BUY = "http://opds-spec.org/acquisition/buy",
	/**
	 * 試閱刊物
	 **/
	ACQUISITION_SAMPLE = "http://opds-spec.org/acquisition/sample",
	/**
	 * 訂閱刊物
	 **/
	ACQUISITION_SUBSCRIBE = "http://opds-spec.org/acquisition/subscribe",
	/**
	 * 刊物圖片(封面)
	 **/
	IMAGE = "http://opds-spec.org/image",
	/**
	 * 刊物圖片之縮圖
	 **/
	IMAGE_THUMBNAIL = "http://opds-spec.org/image/thumbnail",

	/**
	 * 目前資源
	 *
	 * <link rel="self" title="This Page" type="application/atom+xml;profile=opds-catalog" href="/ebooks.opds/"/>
	 */
	SELF = 'self',

	/**
	 * 資源由何處提供
	 */
	VIA = 'via',

	/**
	 * 相關資源
	 */
	ALTERNATE = 'alternate',
	START = 'start',

	/**
	 * 只使用在<Feed>之<link>
	 */
	FACET = 'http://opds-spec.org/facet',

	ENCLOSURE = 'enclosure',

	RELATED = 'related',

	SUBSECTION = 'http://opds-spec.org/subsection',

	CRAWLABLE = 'http://opds-spec.org/crawlable',
}

Object.keys(EnumLinkRel).forEach(k => {

	let lc = k.toLowerCase();

	if (lc !== k && !(lc in EnumLinkRel))
	{
		EnumLinkRel[lc] = EnumLinkRel[k];
	}

});

export enum EnumMIME
{
	jpg = 'image/jpeg',
	jpeg = 'image/jpeg',
	gif = 'image/gif',
	png = 'image/png',
	epub = 'application/epub+zip',

	opds = 'application/atom+xml;profile=opds-catalog',
	pdf = 'application/pdf',
	mobi = 'application/x-mobipocket-ebook',

	html = 'text/htm',
	css = 'text/css',
	plain = 'text/plain',

	atom = 'application/atom+xml',

	/**
	 * OPDS Catalog Entry Document
	 */
	OPDS_CATALOG_ENTRY_DOCUMENT = 'application/atom+xml;type=entry;profile=opds-catalog',
	/**
	 * OPDS Catalog Feed Document
	 */
	OPDS_CATALOG_FEED_DOCUMENT = 'application/atom+xml;profile=opds-catalog',
	/**
	 * Acquisition Feed
	 */
	ACQUISITION_FEED = 'application/atom+xml;profile=opds-catalog;kind=acquisition',
	/**
	 * Navigation Feed
	 */
	NAVIGATION_FEED = 'application/atom+xml;profile=opds-catalog;kind=navigation',
}

export enum EnumPriceCurrencyCode
{
	TWD = 'TWD',
	USD = 'USD',
}

export default exports as typeof import('./const');
