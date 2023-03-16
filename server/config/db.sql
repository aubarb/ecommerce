CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name character varying(20) NOT NULL,
  last_name character varying(20) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(60) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  modified_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE user_addresses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id),
  address_line1 character varying(255),
  address_line2 character varying(255),
  city character varying(20),
  postal_code character varying(20),
  country character varying(20),
  created_at timestamp DEFAULT now(),
  modified_at timestamp DEFAULT now()
);

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name character varying(100) NOT NULL,
  description character varying(100),
  created_at timestamp NOT NULL DEFAULT now(),
  modified_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name character varying(20) NOT NULL,
  price numeric(2,0) NOT NULL,
  description character varying(100),
  sku integer NOT NULL,
  quantity integer NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id),
  created_at timestamp NOT NULL DEFAULT now(),
  modified_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE cart_items (
  user_id uuid NOT NULL REFERENCES users(id),
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  modified_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id),
  total numeric NOT NULL,
  payment_id character varying(255),
  created_at timestamp NOT NULL DEFAULT now(),
  modified_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  order_id uuid NOT NULL REFERENCES orders(id),
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer,
  created_at timestamp NOT NULL DEFAULT now(),
  modified_at timestamp NOT NULL DEFAULT now()
);

CREATE SEQUENCE product_sku_seq
  AS integer
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;
ALTER SEQUENCE product_sku_seq OWNED BY products.sku;

ALTER TABLE ONLY products ALTER COLUMN sku SET DEFAULT nextval('product_sku_seq'::regclass);

CREATE OR REPLACE FUNCTION update_modified()
RETURNS TRIGGER AS $$
BEGIN
  NEW.modified_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_update_modified
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_modified();

CREATE TRIGGER user_addresses_update_modified
AFTER UPDATE ON user_addresses
FOR EACH ROW
EXECUTE PROCEDURE update_modified();

CREATE TRIGGER categories_update_modified
AFTER UPDATE ON categories
FOR EACH ROW
EXECUTE PROCEDURE update_modified();

CREATE TRIGGER products_update_modified
AFTER UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE update_modified();

CREATE TRIGGER cart_items_update_modified
AFTER UPDATE ON cart_items
FOR EACH ROW
EXECUTE PROCEDURE update_modified();

CREATE TRIGGER orders_update_modified
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE update_modified();

CREATE TRIGGER order_items_update_modified
AFTER UPDATE ON order_items
FOR EACH ROW
EXECUTE PROCEDURE update_modified();

INSERT INTO public.categories (name, description)
VALUES 
    ('Drinks', 'All non-alcoholic beverages'),
    ('Fruits', 'All the fruits'),
    ('Vegetables', 'Fresh organic products');


INSERT INTO public.products (name, price, description, sku, quantity, category_id)
VALUES ('Lettuce', 2.00, 'green salad', 2, 40, '245ca74c-bfcb-43bf-8ae7-ee0dd748212e'),
       ('Banana', 1.00, 'Small Yellow banana', 3, 50, 'b676edf7-7dcb-45ef-8d36-c3d995516062'),
       ('Grape', 1.00, 'Grape', 4, 120, 'b676edf7-7dcb-45ef-8d36-c3d995516062'),
       ('Melon', 2.00, 'Just ripe', 5, 100, 'b676edf7-7dcb-45ef-8d36-c3d995516062'),
       ('Orange', 3.00, 'For juice', 6, 100, 'b676edf7-7dcb-45ef-8d36-c3d995516062'),
       ('Cherry', 5.00, 'As good as t gets', 7, 100, 'b676edf7-7dcb-45ef-8d36-c3d995516062'),
       ('Tomatoes', 5.00, 'Organic only', 8, 100, '245ca74c-bfcb-43bf-8ae7-ee0dd748212e'),
       ('Strawberries', 5.00, 'From the market', 9, 100, 'b676edf7-7dcb-45ef-8d36-c3d995516062'),
       ('Cucumber', 2.00, 'Make a fresh salad', 10, 100, '245ca74c-bfcb-43bf-8ae7-ee0dd748212e'),
       ('Orange Juice', 2.00, '100% fruits', 11, 100, 'a08f40bc-3878-4cdf-87e9-d4027d7a9931'),
       ('Grape Juice', 2.00, '100% fruits', 12, 100, 'a08f40bc-3878-4cdf-87e9-d4027d7a9931'),
       ('Pomegranate Juice', 3.00, '100% fruits', 13, 100, 'a08f40bc-3878-4cdf-87e9-d4027d7a9931');
