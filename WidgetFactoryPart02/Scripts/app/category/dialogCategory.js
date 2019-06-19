// ----------------------------------------------------------
// Скрипт: Виджет диалога для Категории продукции
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.dialogCategory', $.custom.dialogBase, {

        _createControls: function () {

            this._super();

            var ctrls = this.ctrls;

            ctrls.tboxCode = $('#tboxCode', this.element);
            ctrls.tboxCode.textbox({
                label: 'Code'
            });

            ctrls.tboxName = $('#tboxName', this.element);
            ctrls.tboxName.textbox({
                label: 'Name'
            });
        },
    });

})(jQuery);