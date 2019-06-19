(function ($) {

    $.widget('custom.comboCategory', {

        _create: function () {

            this.element.combogrid({
                label: 'Category',
                idField: 'id',
                textField: 'name',
                url: '/DropDown/Category/',
                columns: [[
                    { field: 'code', title: 'Code' },
                    { field: 'name', title: 'Name' },
                ]]
            });
        }
    });

})(jQuery);