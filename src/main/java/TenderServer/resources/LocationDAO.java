package TenderServer.resources;

import com.google.common.base.Optional;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by MBAIR on 7/27/17.
 */
public class LocationDAO extends AbstractDAO<Location> {
  /**
   * Constructor.
   *
   * @param sessionFactory Hibernate session factory.
   */
  public LocationDAO(SessionFactory sessionFactory) {
    super(sessionFactory);
  }

  /**
   * Method returns all employees stored in the database.
   *
   * @return list of all employees stored in the database
   */
  public List<Location> findAll() {
    return list(namedQuery("com.olledeux.Location.findAll"));
  }

  /**
   * Looks for employees whose first or last name contains the passed
   * parameter as a substring.
   *
   * @param name query parameter
   * @return list of employees whose first or last name contains the passed
   * parameter as a substring.
   */
  public List<Location> findByName(String name) {
    StringBuilder builder = new StringBuilder("%");
    builder.append(name).append("%");
    return list(
            namedQuery("com.olledeux.Location.findByName")
                    .setParameter("name", builder.toString())
    );
  }

  public List<Location> getLocationByNickName(String nickname){
    StringBuilder builder = new StringBuilder("%");
    builder.append(nickname).append("%");
    return list(
            namedQuery("com.olledeux.Location.findByNickName")
                    .setParameter("name", builder.toString())
    );
  }

  /**
   * Method looks for an employee by her id.
   *
   * @param id the id of an employee we are looking for.
   * @return Optional containing the found employee or an empty Optional
   * otherwise.
   */
  public Optional<Location> findById(long id) {
    return Optional.fromNullable(get(id));
  }


  public Location saveOrUpdate(Location location) {
    return super.persist(location);
  }
}
