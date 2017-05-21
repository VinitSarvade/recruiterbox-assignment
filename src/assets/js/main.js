$(document).ready(function() {
    $( '.open-close' ).click( function () {
       toggleWidget();
    });

    $( '.tab:not(.open-close)' ).click( function () {
        switchTab( $( this ) );
        if ( !$( '.widget').hasClass( 'expanded' ) ) {
            toggleWidget();
        }
    });

    $( '#mail-us form' ).submit( function(e) {
        e.preventDefault();
        var subject = $ ( '#mail-us input[name=subject]' );
        var message = $ ( '#mail-us textarea[name=message]' );
        if ( subject.val() && message.val() ) {
            $( '#mail-us .alert.alert-danger:not(.hidden)' ).addClass( 'hidden' );
            $( '#mail-us .alert.alert-success' ).removeClass( 'hidden' );
            subject.val('') && message.val('')
        }
        else {
            $( '#mail-us .alert.alert-success:not(.hidden)' ).addClass( 'hidden' );
            $( '#mail-us .alert.alert-danger' ).removeClass( 'hidden' );
        }
    });

    $ ( '.alert .close' ).click( function() {
        $( this ).closest( '.alert' ).addClass( 'hidden' );
    });

    function switchTab( tab ) {
        $( '.tab.active, .tab-content.active' ).removeClass( 'active' ); // Reset current active tab
        tab.addClass( 'active' );
        $( '#' + tab.data( 'tab' ) ).addClass( 'active' );
    }

    function toggleWidget() {
        $( '.widget').toggleClass( function () {
            if ( $( '.widget').hasClass( 'expanded' ) ) {
                $( '.widget').removeClass( 'expanded' );
                $( '.widget .open-close > i' ).removeClass( 'fa-remove' ).addClass( 'fa-chevron-up' );
                return 'closed'
            }
            else {
                $( '.widget').removeClass( 'closed' )
                $( '.widget .open-close > i' ).removeClass( 'fa-chevron-up' ).addClass( 'fa-remove' );
                return 'expanded'
            }
        });      
    }
});