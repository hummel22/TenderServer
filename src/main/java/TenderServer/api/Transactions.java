package TenderServer.api;

import TenderServer.resources.LocationDAO;
import TenderServer.resources.Transaction;
import TenderServer.resources.TransactionDAO;
import TenderServer.resources.TransactionFactory;
import com.google.common.base.Optional;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;

import javax.swing.text.html.Option;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Date;
import java.util.List;

/**
 * Created by MBAIR on 7/24/17.
 *
 *
 * Transaction Data is forrmed as
 *
 *  application type: application/json
 *
 *  {
 *    "name": "Wendys Valentines Date",
 *    "date": "2017-06-08",
 *    "location": {
 *      "name": "Wendys",
 *      "town": "Fairfax",
 *      "nickname": "Travel-Spot"
 *    }
 *  }
 */

@Path("/transactions")
@Produces(MediaType.APPLICATION_JSON)
public class Transactions {

  /**
   * The DAO object to manipulate employees.
   */
  private TransactionDAO transactionDAO;
  private LocationDAO locationDAO;

  /**
   * Constructor.
   *
   */
  public Transactions(TransactionDAO transactionDAO, LocationDAO locationDAO) {
    this.transactionDAO = transactionDAO;
    this.locationDAO = locationDAO;
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



  @POST
  @UnitOfWork
  public Transaction update(TransactionFactory transactionFactory) {
      transactionFactory.log();
      Transaction transaction = transactionFactory.buildTransaction(locationDAO);
      transaction.log();
      return transactionDAO.saveOrUpdate(transaction);
  }

}
