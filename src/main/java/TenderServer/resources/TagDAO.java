package TenderServer.resources;

import com.google.common.base.Optional;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by MBAIR on 7/25/17.
 */
public class TagDAO extends AbstractDAO<Tag> {
  /**
   * Constructor.
   *
   * @param sessionFactory Hibernate session factory.
   */
  public TagDAO(SessionFactory sessionFactory) {
    super(sessionFactory);
  }

  /**
   * Method returns all employees stored in the database.
   *
   * @return list of all employees stored in the database
   */
  public List<Tag> findAll() {
    return list(namedQuery("com.olledeux.Tag.findAll"));
  }

  /**
   * Looks for employees whose first or last name contains the passed
   * parameter as a substring.
   *
   * @param name query parameter
   * @return list of employees whose first or last name contains the passed
   * parameter as a substring.
   */
  public List<Tag> findByName(String name) {
    StringBuilder builder = new StringBuilder("%");
    builder.append(name).append("%");
    return list(
            namedQuery("com.olledeux.Tag.findByName")
                    .setParameter("name", builder.toString())
    );
  }

   public Set<Tag> stringsToTags(ArrayList<String> stringTags)  {
     Set<Tag>  tags = new HashSet<Tag>();
     for(String stringTag : stringTags) {
       List<Tag> tagList = findByName(stringTag);
       if(tagList.size() > 0) {
         for (Tag tag : tagList) {
           tags.add(tag);
         }
       } else {
         tags.add(saveOrUpdate(new Tag(stringTag)));
       }
     }
     return tags;
   }

  /**
   * Method looks for an employee by her id.
   *
   * @param id the id of an employee we are looking for.
   * @return Optional containing the found employee or an empty Optional
   * otherwise.
   */
  public Optional<Tag> findById(long id) {
    return Optional.fromNullable(get(id));
  }


  public Tag saveOrUpdate(Tag tag) {
    return super.persist(tag);
  }
}
