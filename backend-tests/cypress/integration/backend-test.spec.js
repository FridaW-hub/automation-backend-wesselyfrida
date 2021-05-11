
const NEW_ROOM_URL = 'http://localhost:3000/api/room/new'
const ROOM_URL = 'http://localhost:3000/api/room/'
const LOGOUT_URL = 'http://localhost:3000/api/logout'

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

     it.only('TC-Create a new room and delete', function(){
        clientHelpers.createRoomThenDeleteRequest(cy)
     })


    it ('tc-create room', function(){
        cy.authenticateSession().then((response =>{
            const payload = {
                "features":["balcony","sea_view"],
                "category":"double",
                "number":"5113",
                "floor":"6",
                "available":true,
                "price":"4590"
            }
            cy.request({
                method: "POST",
                url: NEW_ROOM_URL,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                    'Content-Type': 'application/json',
                },
                body:payload
            }).then((response =>{
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

            cy.request({
                method: "POST",
            url: LOGOUT_URL,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                'Content-Type': 'application/json'
            },    
            }).then((response =>{
                expect(response.body).to.equal('OK')
            }))
        }))
    })  

    

    it ('tc-create then edit room', function(){
        cy.authenticateSession().then((response =>{
            
            const payload = {
                "features":["balcony","sea_view"],
                "category":"double",
                "number":"5113",
                "floor":"6",
                "available":true,
                "price":"4590"
            }

            const payloadChange = {
                "features":["balcony","sea_view"],
                "category":"double",
                "number":"5113",
                "floor":"6",
                "available":false,
                "price":"5590"
            }

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
                //let roomId = response.body[response.body.length -1].id
                cy.request({
                    method: "PUT",
                    url: ROOM_URL+roomId,
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                        'Content-Type': 'application/json',
                    },
                    body:payloadChange
    
                }).then((response =>{
                    const responseCategory = JSON.stringify(response.body.category)
                    expect(responseCategory).to.have.string(payloadChange.category)
                    const responseNumber = JSON.stringify(response.body.number)
                    expect(responseNumber).to.have.string(payloadChange.number)
                    const responseFloor = JSON.stringify(response.body.floor)
                    expect(responseFloor).to.have.string(payloadChange.floor)
                    const responseAvailable = JSON.stringify(response.body.available)
                    expect(responseAvailable).to.have.string(payloadChange.available)
                    const responsePrice = JSON.stringify(response.body.price)
                    expect(responsePrice).to.have.string(payloadChange.price)
                    const responseFeatures = response.body.features
                    expect(responseFeatures).to.deep.equal(payloadChange.features)

                    cy.request({
                        method: "POST",
                    url: LOGOUT_URL,
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                        'Content-Type': 'application/json'
                    },    
                    }).then((response =>{
                        expect(response.body).to.equal('OK')
                    }))
                }))   
            }))

           
        }))
    })

    it ('tc-create then view room', function(){
        cy.authenticateSession().then((response =>{
            
            const payload = {
                "features":["balcony","sea_view"],
                "category":"double",
                "number":"5113",
                "floor":"6",
                "available":true,
                "price":"4590"
            }

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
                //let roomId = response.body[response.body.length -1].id
                cy.request({
                    method: "GET",
                    url: ROOM_URL+roomId,
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                        'Content-Type': 'application/json',
                    },
    
                }).then((response =>{
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

                    cy.request({
                        method: "POST",
                    url: LOGOUT_URL,
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                        'Content-Type': 'application/json'
                    },    
                    }).then((response =>{
                        expect(response.body).to.equal('OK')
                    }))
                }))   
            }))

           
        }))
    })

    it ('tc-create then delete room', function(){
        cy.authenticateSession().then((response =>{
            
            const payload = {
                "features":["balcony","sea_view"],
                "category":"double",
                "number":"5113",
                "floor":"6",
                "available":true,
                "price":"4590"
            }

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
                //let roomId = response.body[response.body.length -1].id
                cy.request({
                    method: "DELETE",
                    url: ROOM_URL+roomId,
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                        'Content-Type': 'application/json',
                    },
    
                }).then((response =>{
                    expect(response.body).to.deep.equal({ok: true})

                    cy.request({
                        method: "POST",
                    url: LOGOUT_URL,
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),    
                        'Content-Type': 'application/json'
                    },    
                    }).then((response =>{
                        expect(response.body).to.equal('OK')
                    }))
                }))   
            }))

           
        }))
    })
    
})
