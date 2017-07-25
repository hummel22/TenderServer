package TenderServer.api;

import TenderServer.resources.Transaction;
import TenderServer.resources.TransactionDAO;
import TenderServer.resources.TransactionEntry;
import TenderServer.resources.TransactionEntryDAO;
import com.google.common.base.Optional;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by MBAIR on 7/25/17.
 */
@Path("/entries")
@Produces(MediaType.APPLICATION_JSON)
public class Entries {



  /**
   * The DAO object to manipulate employees.
   */
  private TransactionEntryDAO transactionEntryDAO;

  /**
   * Constructor.
   *
   */
  public Entries(TransactionEntryDAO transactionEntryDAO) {
    this.transactionEntryDAO = transactionEntryDAO;
  }

  /**
   * Looks for employees whose first or last name contains the passed
   * parameter as a substring. If name argument was not passed, returns all
   * employees stored in the database.
   *
   * @param name query parameter
   * @return list of employees whose first or last name contains the passed
   * parameter as a substring or list of all employees stored in the database.
   */
  @GET
  @UnitOfWork
  public List<TransactionEntry> findByName(@QueryParam("name") Optional<String> name) {
    if (name.isPresent()) {
      return transactionEntryDAO.findByName(name.get());
    } else {
      return transactionEntryDAO.findAll();
    }
  }

  /**
   * Method looks for an employee by her id.
   *
   * @param id the id of an employee we are looking for.
   * @return Optional containing the found employee or an empty Optional
   * otherwise.
   */
  @GET
  @Path("/{id}")
  @UnitOfWork
  public Optional<TransactionEntry> findById(@PathParam("id") LongParam id) {

    return transactionEntryDAO.findById(id.get());
  }



  @POST
  @UnitOfWork
  public TransactionEntry update(TransactionEntry transactionEntry) {
    transactionEntry.log();
    return transactionEntryDAO.saveOrUpdate(transactionEntry);

  }
}
