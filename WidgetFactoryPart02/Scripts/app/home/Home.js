var Home = (function () {

    $(document).ready(function () {

        $('#panelCategoryDialog').panel({
            href: '/Panel/CategoryDialog/',
            onLoad: function () {
                $(this).datagridCategoryDialog();
            }
        });

        $('#panelProductInline').panel({
            href: '/Panel/ProductInline/',
            onLoad: function () {
                $(this).datagridProductInline();
            }
        });


        $('#panelCategoryInline').panel({
            href: '/Panel/CategoryInline/',
            onLoad: function () {
                $(this).datagridCategoryInline();
            }
        });

        $('#panelProductDialog').panel({
            href: '/Panel/ProductDialog/',
            onLoad: function () {
                $(this).datagridProductDialog();
            }
        });


        $('#btnCategory').linkbutton({
            onClick: function () {

                var window = $('<div></div>').appendTo('body');

                window.windowBase().window({
                    title: 'Категории',
                    href: '/Panel/CategoryDialog/',
                    onLoad: function () {
                        $(this).datagridCategoryDialog();
                    }
                });
            }
        });

        $('#btnProduct').linkbutton({
            onClick: function () {

                var window = $('<div></div>').appendTo('body');

                window.windowBase().window({
                    title: 'Товары',
                    href: '/Panel/ProductInline/',
                    onLoad: function () {
                        $(this).datagridProductInline();
                    }
                });
            }
        });

        $('#btnBoth').linkbutton({
            onClick: function () {

                var window = $('<div></div>').appendTo('body');

                window.windowBase().window({
                    title: 'Категории и товары',
                    href: '/Panel/ProductBoth/',
                    onLoad: function () {
                        $(this).panelBoth();
                    }
                });

            }
        });

    });

})();