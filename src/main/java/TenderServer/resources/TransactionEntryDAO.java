package TenderServer.resources;

import com.google.common.base.Optional;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;

/**
 * Created by MBAIR on 7/25/17.
 */
public class TransactionEntryDAO extends AbstractDAO<TransactionEntry> {

  /**
   * Constructor.
   *
   * @param sessionFactory Hibernate session factory.
   */
  public TransactionEntryDAO(SessionFactory sessionFactory) {
    super(sessionFactory);
  }

  /**
   * Method returns all employees stored in the database.
   *
   * @return list of all employees stored in the database
   */
  public List<TransactionEntry> findAll() {
    return list(namedQuery("com.olledeux.TransactionEntry.findAll"));
  }

  /**
   * Looks for employees whose first or last name contains the passed
   * parameter as a substring.
   *
   * @param name query parameter
   * @return list of employees whose first or last name contains the passed
   * parameter as a substring.
   */
  public List<TransactionEntry> findByName(String name) {
    StringBuilder builder = new StringBuilder("%");
    builder.append(name).append("%");
    return list(
            namedQuery("com.olledeux.TransactionEntry.findByName")
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
  public Optional<TransactionEntry> findById(long id) {
    return Optional.fromNullable(get(id));
  }


  public TransactionEntry saveOrUpdate(TransactionEntry transactionEntry) {
    return super.persist(transactionEntry);
  }
}
