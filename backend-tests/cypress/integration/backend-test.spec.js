import * as clientHelpers from '../helpers/clientHelpers'

describe('Testing hotel', function(){

    it('TC-Create a new room', function(){
        clientHelpers.createRoomAssertRequest(cy)
     })

    it('TC-Create a new room and edit', function(){
        clientHelpers.createRoomThenEditRequest(cy)
    })

    it('TC-Create a new room and view', function(){
        clientHelpers.createRoomViewAssertRequest(cy)
    })

    it('TC-Create a new room and delete', function(){
        clientHelpers.createRoomThenDeleteRequest(cy)
    })


   
    
    
})
