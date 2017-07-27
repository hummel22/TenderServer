package TenderServer.api;

import TenderServer.resources.*;
import com.google.common.base.Optional;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
  private TransactionDAO transactionDAO;
  private TagDAO tagDAO;
  /**
   * Constructor.
   *
   */
  public Entries(TransactionEntryDAO transactionEntryDAO, TransactionDAO transactionDAO, TagDAO tagDAO) {
    this.transactionEntryDAO = transactionEntryDAO;
    this.transactionDAO = transactionDAO;
    this.tagDAO = tagDAO;
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
  @Path("/{id}/tags")
  @UnitOfWork
  public String addTags(TagCollection tags, @PathParam("id") LongParam id) {
    //Search If Tags exist
    TagDAO tagDao;
    for(Tag tag : tags.getTags()) {
      if(tagDAO.findByName(tag.getName()).size()> 0)  {

      } else {
        // New Tag Create it
        tagDAO.saveOrUpdate(tag);
      }

      //TagEntryDao.link(tag_id, entry_id)
      System.out.println("Tag: " + tag.getName());
      System.out.println("ID : " + Long.toString(tag.getTag_id()));
    }
    System.out.println("Entry ID: " + id.get().toString());

    //If Tags do not exit create
    //Update tag_entry pairs
    //return transactionEntryDAO.findById(id.get());
    return new String("OK");
  }



  @POST
  @UnitOfWork
  public TransactionEntry update(TransactionEntryFactory transactionEntryFactory) {
    return transactionEntryDAO.saveOrUpdate(transactionEntryFactory.buildEntry(transactionDAO, tagDAO));

  }
}
