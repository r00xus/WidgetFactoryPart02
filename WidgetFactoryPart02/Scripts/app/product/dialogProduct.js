// ----------------------------------------------------------
// Скрипт: Виджет окна диалога для Продукции
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.dialogProduct', $.custom.dialogBase, {

        _createControls: function () {

            this._super();

            var ctrls = this.ctrls;

            ctrls.tboxCode = $('#tboxCode', this.element);
            ctrls.tboxCode.textbox({
                label: 'Код'
            });

            ctrls.tboxName = $('#tboxName', this.element);
            ctrls.tboxName.textbox({
                label: 'Название'
            });

            ctrls.comboCategory = $('#comboCategory', this.element);
            ctrls.comboCategory.comboCategory();

            ctrls.comboType = $('#comboType', this.element);
            ctrls.comboType.comboProductType();

            ctrls.checkboxWithDiscount = $('#checkboxWithDiscount', this.element);
            ctrls.withDiscount = $('#withDiscount', this.element);
        },

        _onLoadSuccess: function (data) {

            var ctrls = this.ctrls;

            ctrls.withDiscount.val('false');

        },
    });

})(jQuery);