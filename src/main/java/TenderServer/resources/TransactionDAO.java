package TenderServer.resources;

import com.google.common.base.Optional;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;

import java.util.Date;
import java.util.List;

/**
 * Created by MBAIR on 7/24/17.
 */
public class TransactionDAO extends AbstractDAO<Transaction> {

  /**
   * Constructor.
   *
   * @param sessionFactory Hibernate session factory.
   */
  public TransactionDAO(SessionFactory sessionFactory) {
    super(sessionFactory);
  }

  /**
   * Method returns all employees stored in the database.
   *
   * @return list of all employees stored in the database
   */
  public List<Transaction> findAll() {
    return list(namedQuery("com.olledeux.Transaction.findAll"));
  }

  /**
   * Looks for employees whose first or last name contains the passed
   * parameter as a substring.
   *
   * @param name query parameter
   * @return list of employees whose first or last name contains the passed
   * parameter as a substring.
   */
  public List<Transaction> findByName(String name) {
    StringBuilder builder = new StringBuilder("%");
    builder.append(name).append("%");
    return list(
            namedQuery("com.olledeux.Transaction.findByName")
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
  public Optional<Transaction> findById(long id) {
    return Optional.fromNullable(get(id));
  }


  public Transaction saveOrUpdate(Transaction transaction) {
    return super.persist(transaction);
  }
}
