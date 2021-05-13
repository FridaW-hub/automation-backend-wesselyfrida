
const NEW_ROOM_URL = 'http://localhost:3000/api/room/new'
const ROOM_URL = 'http://localhost:3000/api/room/'
const LOGOUT_URL = 'http://localhost:3000/api/logout'

const payload = {
    "features":["balcony","sea_view"],
    "category":"double",
    "number":"5113",
    "floor":"6",
    "available":true,
    "price":"4590"
}


function payloadChange (roomId){
 const   payloadChangeConst = {
        "features":["balcony","sea_view"],
        "category":"double",
        "number":"5113",
        "floor":"6",
        "available":false,
        "price":"5590",
        "id": roomId
    }
    return payloadChangeConst
}

function logoutAssertRequest(cy){
    cy.request({
        method: "POST",
    url: LOGOUT_URL,
    headers:{
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
        'Content-Type': 'application/json'
    },    
    }).then((response =>{
        expect(response.status).to.eq(200)
        expect(response.body).to.equal('OK')
    }))
}

function editRoomAssertRequest(cy, roomId){
    const localPayloadChange = payloadChange(roomId)
    cy.request({
        method: "PUT",
        url: ROOM_URL+roomId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
            'Content-Type': 'application/json',
        },
        body:localPayloadChange
        

    }).then((response =>{
        expect(response.status).to.eq(200)
        const responseCategory = JSON.stringify(response.body.category)
        expect(responseCategory).to.have.string(localPayloadChange.category)
        const responseNumber = JSON.stringify(response.body.number)
        expect(responseNumber).to.have.string(localPayloadChange.number)
        const responseFloor = JSON.stringify(response.body.floor)
        expect(responseFloor).to.have.string(localPayloadChange.floor)
        const responseAvailable = JSON.stringify(response.body.available)
        expect(responseAvailable).to.have.string(localPayloadChange.available)
        const responsePrice = JSON.stringify(response.body.price)
        expect(responsePrice).to.have.string(localPayloadChange.price)
        const responseFeatures = response.body.features
        expect(responseFeatures).to.deep.equal(localPayloadChange.features)


    }))
}

function createRoomInternal(cy){
    cy.request({
        method: "POST",
        url: NEW_ROOM_URL,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
            'Content-Type': 'application/json',
        },
        body:payload
    }).then((response =>{
        expect(response.status).to.eq(200)
        const responseCategory = JSON.stringify(response.body.category)
        expect(responseCategory).to.have.string(payload.category)
        const responseNumber = JSON.stringify(response.body.number)
        expect(responseNumber).to.have.string(payload.number)
        const responseFloor = JSON.stringify(response.body.floor)
        expect(responseFloor).to.have.string(payload.floor)
        const responseAvailable = JSON.stringify(response.body.available)
        expect(responseAvailable).to.have.string(payload.available)
        const responsePrice = JSON.stringify(response.body.price)
        expect(responsePrice).to.have.string(payload.price)
        const responseFeatures = response.body.features
        expect(responseFeatures).to.deep.equal(payload.features)
       
    }))
}

function createRoomAssertRequest(cy){
    cy.authenticateSession().then((response =>{
        createRoomInternal(cy)
        logoutAssertRequest(cy)
    }))
}

function createRoomThenEditRequest(cy){
    
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "POST",
            url: NEW_ROOM_URL,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                'Content-Type': 'application/json',
            },
            body:payload
        }).then((response =>{
            cy.log(response.body.id)
            let roomId = response.body.id
            editRoomAssertRequest(cy, roomId)
            
            
        }))          
        logoutAssertRequest(cy)
    }))
}

function createRoomViewAssertRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "POST",
            url: NEW_ROOM_URL,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                'Content-Type': 'application/json',
            },
            body:payload
        }).then((response =>{
            cy.log(response.body.id)
            let roomId = response.body.id
            editRoomAssertRequest(cy, roomId)
            
            
        }))          
        logoutAssertRequest(cy)
    }))    
}

function createRoomThenDeleteRequest(cy){
    cy.authenticateSession().then((response =>{

        cy.request({
            method: "POST",
            url: NEW_ROOM_URL,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                'Content-Type': 'application/json',
            },
            body:payload
        }).then((response =>{
            cy.log(response.body.id)
            let roomId = response.body.id
            deleteRoom(cy, roomId)
        }))
        logoutAssertRequest(cy)   
    }))

     
}


function deleteRoom(cy, roomId){
    cy.request({
        method: "DELETE",
        url: ROOM_URL+roomId,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
            'Content-Type': 'application/json',
        },

    }).then((response =>{
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.equal({ok: true})
    }))   
}

module.exports = {
    createRoomAssertRequest,
    createRoomThenEditRequest,
    createRoomViewAssertRequest,
    createRoomThenDeleteRequest
}
