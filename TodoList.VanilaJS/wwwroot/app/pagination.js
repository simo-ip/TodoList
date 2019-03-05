let Pagination = {
    render: function (data) {
        let href = '#/todo';

        $('.pagination').empty();
        if (data.CurrentPage === 1) {
            $('.pagination').append('<li><span class="disabled">First page</span></li>');
        } else {
            $('.pagination').append('<li><a href="' + href+'/1" data-uri="/api/todo/1">First page</a></li>');
        }
        for (var i = 1; i <= data.pages; i++) {
            var prop = { url: '#' + i, uri: '/api/todo/' + i, caption: i };
            if (i === data.CurrentPage) {
                $('.pagination').append('<li class="active"><span>' + i + '</span></li>');
            } else {
                $('.pagination').append('<li><a href="' + href + '/' + i + '" data-uri="/api/todo/' + i + '">' + i + '</a></li>');
            }
        }
        if (data.CurrentPage === data.pages) {
            $('.pagination').append('<li><span class="disabled">Last page</span></li>');
        } else {
            $('.pagination').append('<li><a href="' + href + '/' + data.pages + '" data-uri=/api/todo/' + data.pages + '>Last page</a></li>');
        }
    }
};

export default Pagination;