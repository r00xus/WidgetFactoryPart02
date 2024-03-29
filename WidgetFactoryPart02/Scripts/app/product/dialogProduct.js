﻿// ----------------------------------------------------------
// Скрипт: Виджет окна диалога для Продукции
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.dialogProduct', $.custom.dialogBase, {

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

            ctrls.comboCategory = $('#comboCategory', this.element);
            ctrls.comboCategory.comboCategory();
        },
    });

})(jQuery);