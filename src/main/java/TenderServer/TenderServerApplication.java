package TenderServer;

import TenderServer.api.Entries;
import TenderServer.api.Locations;
import TenderServer.api.Tags;
import TenderServer.api.Transactions;
import TenderServer.resources.*;
import io.dropwizard.Application;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class TenderServerApplication extends Application<TenderServerConfiguration> {

    public static void main(final String[] args) throws Exception {
        new TenderServerApplication().run(args);
    }

    @Override
    public String getName() {
        return "TenderServer";
    }


    /**
     * Register the Database connections
     * Uses the config.yaml database to load values - Create the Bindle wrapper to register bundle
     */
    private final HibernateBundle<TenderServerConfiguration> hibernate = new HibernateBundle<TenderServerConfiguration>(Transaction.class, TransactionEntry.class, Tag.class, Location.class) {
        @Override
        public DataSourceFactory getDataSourceFactory(TenderServerConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };




    @Override
    public void initialize(final Bootstrap<TenderServerConfiguration> bootstrap) {
        /**
         * Database connections
         */
        bootstrap.addBundle(hibernate);


        /**
         * Migrations
         */
        bootstrap.addBundle(new MigrationsBundle<TenderServerConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(TenderServerConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
    }

    @Override
    public void run(final TenderServerConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application

        /**
         * Register Location API
         */
        final LocationDAO locationDAO = new LocationDAO(hibernate.getSessionFactory());
        environment.jersey().register(new Locations(locationDAO));

        /**
         * Register Transacion API
         */
        final TransactionDAO transactionDAO = new TransactionDAO(hibernate.getSessionFactory());
        environment.jersey().register(new Transactions(transactionDAO, locationDAO));

        /**
         * Register Tag API
         */
        final TagDAO tagDAO = new TagDAO(hibernate.getSessionFactory());
        environment.jersey().register(new Tags(tagDAO));

        /**
         * Register Entries API
         */
        final TransactionEntryDAO transactionEntryDAO = new TransactionEntryDAO(hibernate.getSessionFactory());
        environment.jersey().register(new Entries(transactionEntryDAO, transactionDAO, tagDAO));




    }

}
