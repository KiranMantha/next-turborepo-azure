# Setting up AEM 6.5 cloud app for remote-spa

run below maven command to create a new aem project:

```
mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.2.1:generate \
-D archetypeGroupId=com.adobe.aem \
-D archetypeArtifactId=aem-project-archetype \
-D archetypeVersion=41 \
-D aemVersion=cloud \
-D appTitle="AEM Cloud App" \
-D appId="aem-cloud-app" \
-D groupId="com.adobe.aem.guides.aemcloudapp" \
-D frontendModule="decoupled"
```

once the project is created, navigate to that project folder and run below command to view it in aem sites page:

```
mvn clean install -PautoInstallPackage
```

then navigate to aem sites, navigate to the project and create a new page.

choose `Remote Next.js Page` and provide the page title under `Basic` tab and next.js page url under `SPA` tab.

NOTE: the next.js page url should not be the same. every aem page should mapped to a nextjs page.
