### Comando para rodar o postgres com docker:

```bash
docker run -d \
  --name edublog-postgres \
  -e POSTGRES_DB=edublog_development \
  -e POSTGRES_USER=edublog_user \
  -e POSTGRES_PASSWORD=edublog_password \
  -p 5432:5432 \
  -v edublog_pgdata:/var/lib/postgresql/data \
  postgres:16
```
