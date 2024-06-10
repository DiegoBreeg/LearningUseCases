import Ticket from "../../domain/entity/Ticket.js";

export default interface TicketRepository {

    save(ticket: Ticket): Promise<void>
    get(ticketId: string): Promise<Ticket>
    update(ticket: Ticket): Promise<void>
}