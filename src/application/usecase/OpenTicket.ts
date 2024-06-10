import Ticket from "../../domain/entity/Ticket.js"
import Queue from "../../infra/queue/Queue.js"
import TicketRepository from "../repository/TicketRepository.js"
import EmailService from "../service/EmailService.js"
import IntegrationService from "../service/IntegrationService.js"
import PaymentService from "../service/PaymentService.js"

export default class OpenTicket {

    constructor(
        readonly ticketRepository: TicketRepository,
        readonly paymentService: PaymentService,
        readonly integrationService: IntegrationService,
        readonly emailService: EmailService,
        readonly queue: Queue
    ) {
    }

    async execute(input: Input): Promise<Output> {
        const ticket = Ticket.create(input.requesterId, input.content)
        await this.ticketRepository.save(ticket)
        //chamando um sistema externo, isso causa acoplamento
        // transação de longa duração e distribuída
        //await this.paymentService.processPayment()
        //await this.integrationService.integrateWithTrello()
        //await this.emailService.sendEmail()
        await this.queue.publish("ticketOpened", ticket)
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