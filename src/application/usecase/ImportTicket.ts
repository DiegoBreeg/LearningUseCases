import Ticket from "../../domain/entity/Ticket"
import Queue from "../../infra/queue/Queue"
import TicketRepository from "../repository/TicketRepository"
import EmailService from "../service/EmailService"
import IntegrationService from "../service/IntegrationService"
import PaymentService from "../service/PaymentService"
import OpenTicket from "./OpenTicket"

export default class ImportTickets {

    constructor(
        readonly openTicket: OpenTicket
    ) {
    }

    async execute (input: Input): Promise<void> {
        for (const ticketInput of input.tickets) {
            await this.openTicket.execute(ticketInput)
        }
    }
}

type Input = {
    tickets: { requesterId: string, content: string }[]
}