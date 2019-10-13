var Home = (function () {

    $(document).ready(function () {

        $('#panelCategoryDialog1').panel({
            href: '/Panel/CategoryDialog/',
            onLoad: function () {
                $(this).datagridCategoryDialog();
            }
        });

        $('#panelCategoryDialog2').panel({
            href: '/Panel/CategoryDialog/',
            onLoad: function () {
                $(this).datagridCategoryDialog();
            }
        });


        $('#panelProductDialog1').panel({
            href: '/Panel/ProductDialog/',
            onLoad: function () {
                $(this).datagridProductDialog();
            }
        });

        $('#panelProductDialog2').panel({
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
                    href: '/Panel/ProductDialog/',
                    onLoad: function () {
                        $(this).datagridProductDialog();
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