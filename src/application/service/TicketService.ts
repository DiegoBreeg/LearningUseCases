import TicketDAO from "../dao/TicketDao.js";
import EmailService from "./EmailService.js";
import IntegrationService from "./IntegrationService.js";
import PaymentService from "./PaymentService.js";

export default class TicketService {

    constructor (
        readonly ticketDAO: TicketDAO,
        readonly paymentService: PaymentService,
        readonly integrationService: IntegrationService,
        readonly emailService: EmailService
    ) {

    }

    async openTicket (requesterId: string, content: string) {
        const ticketId = crypto.randomUUID()
        // DTO - DATA TRANSFER OBJECT
        const ticket = {
            ticketId,
            requesterId,
            content,
            startDate: new Date(),
            status: "open"

        }    
        await this.ticketDAO.save(ticket);
        await this.paymentService.processPayment()
        await this.integrationService.integrateWithTrello()
        await this.emailService.sendEmail()
    }

    async assignTicket (ticketId: string, assingeeId: string) {
        const ticket = await this.ticketDAO.get(ticketId)
        ticket.assigneeId = assingeeId
        ticket.status = "assigned"
        await this.ticketDAO.update(ticket)
    }

    async closeTicket (ticketId: string) {
        const ticket = await this.ticketDAO.get(ticketId)
        if (ticket.status === "open") throw new Error("Ticket is not assigned")   
        ticket.status = "closed"
        ticket.endDate = new Date()
        ticket.duration = ticket.endDate.getTime() - ticket.startDate.getTime()
        await this.ticketDAO.update(ticket)
    }

    importTickets () {

    }
    exportTickets () {

    }

    getTicket () {

    }
}