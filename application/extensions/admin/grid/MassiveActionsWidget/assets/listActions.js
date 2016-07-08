/**
 * Massive actions Widget, action behaviour
 *
 * This JavaScript define what's happen when user click on an action
 */

 $(document).on('click', '.listActions a', function ()
 {
         $that          = $(this);                                                             // The cliked link
         $actionUrl     = $that.data('url');                                                   // The url of the Survey Controller action to call
         $gridid        = $('.listActions').data('grid-id');
         $oCheckedItems = $.fn.yiiGridView.getChecked($gridid, $('.listActions').data('pk')); // List of the clicked checkbox
         $oCheckedItems = JSON.stringify($oCheckedItems);

         // TODO : Switch action (post, session, ajax...)

         // For actions without modal, doing a redirection
         // TODO: replace all of them with the method above

         // TODO : Switch case "redirection (with 2 type; post or fill session)"
         if($that.data('post-redirect'))
         {
             var newForm = jQuery('<form>', {
                 'action': $actionUrl,
                 'target': '_blank',
                 'method': 'POST'
             }).append(jQuery('<input>', {
                 'name': $that.data('input-name'),
                 'value': $oCheckedItems.join("|"),
                 'type': 'hidden'
             })).append(jQuery('<input>', {
                 'name': 'YII_CSRF_TOKEN',
                 'value': LS.data.csrfToken,
                 'type': 'hidden'
             })).appendTo('body');
             newForm.submit();
             return;
         }

         // For actions without modal, doing a redirection
         // Using session before redirect rather than form submission
         if($that.data('fill-session-and-redirect'))
         {
             // postUrl is defined as a var in the View
             $(this).load(postUrl, {
                 participantid:$oCheckedItems},function(){
                     $(location).attr('href',$actionUrl);
             });
             return;
         }


         // TODO: switch case "Modal"
         $modal  = $('#'+$that.data('modal-id'));   // massive-actions-modal-<?php $aAction['action'];?>-<?php echo $key; ?>

         // Needed modal elements
         $modalTitle    = $modal.find('.modal-title');                   // Modal Title
         $modalBody     = $modal.find('.modal-body-text');               // Modal Body
         $modalButton   = $modal.find('.btn-ok');

         $modalClose    = $modal.find('.modal-footer-close');            // Modal footer with close button
         $ajaxLoader    = $("#ajaxContainerLoading");                    // Ajax loader

         // Original modal state
         $oldModalTitle     = $modalTitle.text();
         $oldModalBody      = $modalBody.html();
         $oldModalButtons   = $modal.find('.modal-footer-buttons');     // Modal footer with yes/no buttons

         // When user close the modal, we put it back to its original state
         $modal.on('hidden.bs.modal', function (e) {
             $modalTitle.text($oldModalTitle);               // the modal title
             $modalBody.empty().append($oldModalBody);       // modal body
             $modalClose.hide();                             // Hide the 'close' button
             $oldModalButtons.show();                        // Show the 'Yes/No' buttons

             if ($that.data('grid-reload') == "yes")
             {
                $.fn.yiiGridView.update($gridid);               // Update the surveys list
             }

         })

         // Define what should be done when user confirm the mass action
         $modalButton.on('click', function(){

             if( $modal.data('keepopen') != 'yes' )
             {
                 $modal.modal('hide');
             }

             // Update the modal elements
             // TODO: ALL THIS DEPEND ON KEEPOPEN OR NOT
             $modalBody.empty();                                         // Empty the modal body
             $oldModalButtons.hide();                                    // Hide the 'Yes/No' buttons
             $modalClose.show();                                         // Show the 'close' button
             $ajaxLoader.show();                                         // Show the ajax loader

             $postDatas  = {sItems:$oCheckedItems};
             $modal.find('.custom-modal-datas .custom-data').each(function(i, el)
             {
                 $postDatas[$(this).attr('name')]=$(this).val();
             });

             // Ajax request
             $.ajax({
                 url : $actionUrl,
                 type : 'POST',
                 data :  $postDatas,

                 // html contains the buttons
                 success : function(html, statut){
                     $ajaxLoader.hide();                                 // Hide the ajax loader

                     // This depend on keepopen
                     $modalBody.empty().html(html);                      // Inject the returned HTML in the modal body
                 },
                 error :  function(html, statut){
                     $ajaxLoader.hide();
                     $modal.find('.modal-body-text').empty().html(html.responseText);
                     console.log(html);
                 }
             });
         });

         // open the modal
         if(!$.isEmptyObject($oCheckedItems))
         {
             $modal.modal();
         }
     });
