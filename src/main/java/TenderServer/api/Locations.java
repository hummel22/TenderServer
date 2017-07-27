package TenderServer.api;

import TenderServer.resources.Location;
import TenderServer.resources.LocationDAO;
import TenderServer.resources.Tag;
import TenderServer.resources.TagDAO;
import com.google.common.base.Optional;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by MBAIR on 7/27/17.
 */
@Path("/locations")
@Produces(MediaType.APPLICATION_JSON)
public class Locations {

  /**
   * The DAO object to manipulate employees.
   */
  private LocationDAO locationDAO;

  /**
   * Constructor.
   *
   */
  public Locations(LocationDAO locationDAO) {
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
  public List<Location> findByName(@QueryParam("name") Optional<String> name) {
    if (name.isPresent()) {
      return locationDAO.findByName(name.get());
    } else {
      return locationDAO.findAll();
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
  public Optional<Location> findById(@PathParam("id") LongParam id) {

    return locationDAO.findById(id.get());
  }


  @POST
  @UnitOfWork
  public Location update(Location location) {
    return locationDAO.saveOrUpdate(location);

  }
}
