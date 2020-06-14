export declare const FEED: {
    tag: string;
    attributes: {
        xmlns: {
            default: string;
        };
        xmlnsdc: {
            name: string;
            default: string;
        };
        xmlnsopds: {
            name: string;
            default: string;
        };
    };
    fields: {
        id: {};
        title: {};
        subtitle: {};
        icon: {};
        logo: {};
        updated: {
            transform: (d: any) => string;
        };
        links: {
            tag: string;
            array: boolean;
            attributes: {
                href: {};
                title: {};
                rel: {
                    transform(v: string): string;
                };
                type: {};
            };
            fields: {
                price: {
                    tag: string;
                    inner: string;
                    attributes: {
                        currencycode: {};
                    };
                    map: {
                        to: string;
                    };
                };
            };
            map: {
                href: string;
            };
        };
        authors: {
            tag: string;
            array: boolean;
            fields: {
                name: {};
                uri: {};
                email: {};
            };
            map: {
                to: string;
            };
        };
        books: {
            tag: string;
            array: boolean;
            fields: {
                id: {};
                title: {};
                subtitle: {};
                published: {
                    tag: string;
                    transform: (d: any) => string;
                };
                updated: {
                    tag: string;
                    transform: (d: any) => string;
                };
                summary: {
                    tag: string;
                    inner: string;
                    cdata: boolean;
                    raw: boolean;
                    attributes: {
                        type: {
                            default: string;
                        };
                    };
                    map: {
                        to: string;
                    };
                };
                links: {
                    tag: string;
                    array: boolean;
                    attributes: {
                        href: {};
                        title: {};
                        rel: {
                            transform(v: string): string;
                        };
                        type: {};
                    };
                    fields: {
                        price: {
                            tag: string;
                            inner: string;
                            attributes: {
                                currencycode: {};
                            };
                            map: {
                                to: string;
                            };
                        };
                    };
                    map: {
                        href: string;
                    };
                };
                authors: {
                    tag: string;
                    array: boolean;
                    fields: {
                        name: {};
                        uri: {};
                        email: {};
                    };
                    map: {
                        to: string;
                    };
                };
                categories: {
                    tag: string;
                    array: boolean;
                    attributes: {
                        code: {
                            name: string;
                        };
                        label: {};
                        scheme: {
                            default: string;
                        };
                    };
                    map: {
                        to: string;
                    };
                };
                issued: {
                    tag: string;
                    transform: (d: any) => string;
                };
                publisher: {
                    tag: string;
                };
                language: {
                    tag: string;
                };
                rights: {};
                content: {
                    tag: string;
                    inner: string;
                    cdata: boolean;
                    raw: boolean;
                    attributes: {
                        type: {
                            default: string;
                        };
                    };
                    map: {
                        to: string;
                    };
                };
                identifier: {
                    tag: string;
                };
            };
        };
    };
};
export default FEED;
