(function ($) {

    $.widget('custom.comboCategory', {

        _create: function () {

            this.element.combogrid({
                label: 'Категория',
                idField: 'id',
                textField: 'name',
                url: '/DropDown/Category/',
                columns: [[
                    { field: 'code', title: 'Код' },
                    { field: 'name', title: 'Название' },
                ]]
            });
        }
    });

})(jQuery);