// ----------------------------------------------------------
// Скрипт: Виджет базового окна
// Программист: Рунчев Р.П.
// ----------------------------------------------------------

(function ($) {

    $.widget('custom.windowBase', {

        // Конструктор
        _create: function () {

            this.element.window({
                minimizable: false,
                collapsible: false,                
                modal: true,
                width: '60%',
                height: '60%',
                onOpen: function () {
                    $(this).window('center');
                },
                onClose: function () {
                    $(this).window('destroy');
                }
            });
        }
    });

})(jQuery);