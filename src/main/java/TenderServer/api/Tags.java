package TenderServer.api;

import TenderServer.resources.Tag;
import TenderServer.resources.TagDAO;
import com.google.common.base.Optional;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by MBAIR on 7/25/17.
 */
@Path("/tags")
@Produces(MediaType.APPLICATION_JSON)
public class Tags {

  /**
   * The DAO object to manipulate employees.
   */
  private TagDAO tagDAO;

  /**
   * Constructor.
   *
   */
  public Tags(TagDAO tagDAO) {
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
  public List<Tag> findByName(@QueryParam("name") Optional<String> name) {
    if (name.isPresent()) {
      return tagDAO.findByName(name.get());
    } else {
      return tagDAO.findAll();
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
  public Optional<Tag> findById(@PathParam("id") LongParam id) {

    return tagDAO.findById(id.get());
  }



  @POST
  @UnitOfWork
  public Tag update(Tag tag) {
    return tagDAO.saveOrUpdate(tag);

  }
}
