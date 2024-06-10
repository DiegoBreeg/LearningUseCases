import Ticket from "../../domain/entity/Ticket.js"
import TicketRepository from "../repository/TicketRepository.js"
import EmailService from "../service/EmailService.js"
import IntegrationService from "../service/IntegrationService.js"
import PaymentService from "../service/PaymentService.js"

export default class OpenTicket {

    constructor(
        readonly ticketRepository: TicketRepository,
        readonly paymentService: PaymentService,
        readonly integrationService: IntegrationService,
        readonly emailService: EmailService
    ) {
    }

    async execute(input: Input): Promise<Output> {
        const ticket = Ticket.create(input.requesterId, input.content)
        await this.ticketRepository.save(ticket)
        //chamando um sistema externo
        await this.paymentService.processPayment()
        await this.integrationService.integrateWithTrello()
        await this.emailService.sendEmail()
        return Promise.resolve({ticketId: ticket.ticketId})
    }
}

type Input = {
    requesterId: string,
    content: string
}

type Output = {
    ticketId: string
}