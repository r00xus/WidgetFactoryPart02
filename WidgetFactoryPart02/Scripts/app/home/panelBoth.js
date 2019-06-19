// ----------------------------------------------------------
// Скрипт:
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.panelBoth', {

        _create: function () {

            var that = this;

            this.layout = $('#layout', this.element);

            this.tabs = $('#tabs', this.element);
            this.tabs.tabs();

            this.tabCategory = $('#tabCategory', this.element);
            this.tabCategory.panel({
                onLoad: function () {
                    $(this).datagridCategoryInline();
                }
            });

            this.tabProduct = $('#tabProduct', this.element);
            this.tabProduct.panel({
                onLoad: function () {
                    $(this).datagridProductDialog();
                }
            });

            this.menuAdd = $('#menuAdd', this.element);
            this.menuAdd.menu({
                onClick: function (item) {

                    switch (item.name) {
                        case 'itemCategory':

                            that.tabs.tabs('add', {
                                title: 'Категории',
                                closable: true,
                                href: '/Panel/CategoryDialog/',
                                onLoad: function () {
                                    $(this).datagridCategoryDialog();
                                }
                            });

                            break;
                        case 'itemProduct':

                            that.tabs.tabs('add', {
                                title: 'Товары',
                                closable: true,
                                href: '/Panel/ProductInline/',
                                onLoad: function () {
                                    $(this).datagridProductInline();
                                }
                            });

                            break;
                        default:
                            break;
                    }
                }
            });

            this.mbtnAdd = $('#mbtnAdd', this.element);
            this.mbtnAdd.menubutton({
                menu: this.menuAdd
            });

            this.layout.layout('resize');

        },
    });

})(jQuery);