package TenderServer.api;

import TenderServer.resources.Transaction;
import TenderServer.resources.TransactionDAO;
import com.google.common.base.Optional;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by MBAIR on 7/24/17.
 */

@Path("/transactions")
@Produces(MediaType.APPLICATION_JSON)
public class Transactions {

  /**
   * The DAO object to manipulate employees.
   */
  private TransactionDAO transactionDAO;

  /**
   * Constructor.
   *
   */
  public Transactions(TransactionDAO transactionDAO) {
    this.transactionDAO = transactionDAO;
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
  public List<Transaction> findByName(@QueryParam("name") Optional<String> name) {
    if (name.isPresent()) {
      return transactionDAO.findByName(name.get());
    } else {
      return transactionDAO.findAll();
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
  public Optional<Transaction> findById(@PathParam("id") LongParam id) {
    return transactionDAO.findById(id.get());
  }

}
