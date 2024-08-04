-- AlterTable
CREATE SEQUENCE orderproducts_id_seq;
ALTER TABLE "OrderProducts" ALTER COLUMN "id" SET DEFAULT nextval('orderproducts_id_seq');
ALTER SEQUENCE orderproducts_id_seq OWNED BY "OrderProducts"."id";
