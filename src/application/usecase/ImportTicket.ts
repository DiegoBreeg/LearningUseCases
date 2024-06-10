import Ticket from "../../domain/entity/Ticket"
import TicketRepository from "../repository/TicketRepository"
import EmailService from "../service/EmailService"
import IntegrationService from "../service/IntegrationService"
import PaymentService from "../service/PaymentService"
import OpenTicket from "./OpenTicket"

export default class ImportTicket {

    constructor(
        readonly openTicket: OpenTicket
    ) {
    }

    async execute (input: Input): Promise<void> {        
        for (const ticketInput of input.tickets) {
        }
    }
}

type Input = {
    tickets: { requesterId: string, content: string }[]
}