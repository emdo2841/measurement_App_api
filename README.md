Scalable & High-Availability Web Infrastructure

A robust, containerized backend architecture engineered for high availability, fault tolerance, and optimal performance. This project demonstrates horizontal scaling, traffic load balancing with rate limiting, database redundancy to eliminate single points of failure (SPOF), and in-memory caching for low-latency performance.

System Architecture

The infrastructure consists of four primary tiers fully containerized and orchestrated via Docker Compose:

Load Balancer & Reverse Proxy Layer (Nginx)

Distributes incoming HTTP requests evenly across multiple application servers.

Enforces Rate Limiting to protect backend services from abusive traffic and Denial-of-Service (DoS) attacks.

Application Server Layer

3 identical backend server instances running in parallel.

Decoupled and horizontally scalable to handle high throughput.

Caching Layer (Redis)

In-memory data store acting as a caching layer for frequently accessed query results.

Significantly reduces database load and decreases response latency.

Database Layer (Replicated Clusters)

3 Database replicas organized in a primary-replica (master-slave) setup.

Prevents Single Points of Failure (SPOF) by providing data redundancy and high availability.

🛠 Tech Stack

Reverse Proxy / Load Balancer: Nginx

Container Orchestration: Docker / Docker Compose

Application Servers: Node.js / Python / Go (Adapt as applicable)

Caching Layer: Redis

Database: PostgreSQL / MySQL (Configured with 3 replicas)

Key Features

Horizontal Scalability: Backend server instances can easily be scaled up or down based on incoming load.

Traffic Management: Round-robin load balancing ensures even distribution of requests across all 3 backend instances.

Rate Limiting: Configured within Nginx (limit_req_zone) to throttle incoming client requests based on IP addresses.

High Availability & Fault Tolerance: Database replication ensures continuous service availability and data persistence even if one node fails.

Performance Optimization: Redis caches hotspot data, dramatically improving read heavy operations.

 Architecture Diagram Overview

               +-----------------------+
               |     Client Traffic    |
               +-----------+-----------+
                           |
                           v
               +-----------------------+
               |  Nginx Load Balancer  |
               |    & Rate Limiter     |
               +-----------+-----------+
                           |
       +-------------------+-------------------+
       |                   |                   |
       v                   v                   v
+--------------+    +--------------+    +--------------+
| App Instance |    | App Instance |    | App Instance |
|      #1      |    |      #2      |    |      #3      |
+------+-------+    +------+-------+    +------+-------+
       |                   |                   |
       +-------------------+-------------------+
                           |
            +--------------+--------------+
            |                             |
            v                             v
  +-------------------+        +---------------------+
  |   Redis Cache     |        |   Primary Database  |
  +-------------------+        +----------+----------+
                                          | (Replication)
                               +----------+----------+
                               |                     |
                               v                     v
                      +-----------------+   +-----------------+
                      |  DB Replica 1   |   |  DB Replica 2   |
                      +-----------------+   +-----------------+
