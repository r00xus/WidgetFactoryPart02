(function ($) {

    $.widget('custom.comboProductType', {

        _create: function () {

            this.element.combobox({
                label: 'Тип продукта',
                url: '/DropDown/ProductTypes/',
            });
        }
    });

})(jQuery);