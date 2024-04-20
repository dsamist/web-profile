This application was deployed to Digital Ocean k8s and this is how the ingress was created

1. Install a controller in this case, I used the nginx
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/do/deploy.yaml
    NB: by default, this will create a namespace for the controller and all the resources required.

2. Create an ingress resource like the type I did [ingress resource](/kubernetes/ingress.yaml) and apply using kubectl apply -f <name of ingress file>

3. Wait for some minutes for the ingress resources to get a public IP, this IP will also be the same with the external IP of the ingress controller and this is gotten from the IP assigned by the cloud service provider loadbalancer

4. Got to your DNS manager and map the public IP to the domain name using "A record"

5. Install a certificate manager. This is to help with the TLS provisioning and assigning of certificate. it a a k8s add-ons resource.
        kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.7.1/cert-manager.yaml
        confirm that the cert-mamager pods are running: kubectl get pods --namespace cert-manager

6. If it doesn't exist already, create your certificate as a secret in your cluster.
    kubectl create secret tls letsencrypt-staging \
    --cert=path/to/your/certificate.pem \
    --key=path/to/your/private-key.pem

        NB: If you have your certificate files in other formats, you have to convert them to .pem before using it it create the secret

        # Convert certificate to PEM format
        openssl x509 -inform DER -in your_certificate.crt -out your_certificate.pem

        # Convert private key to PEM format
        openssl rsa -in your_private_key.key -out your_private_key.pem

7. Create a certificate issuer resource like I did [issuer](./cert_issuer.yaml)
8. For this step, since I am using a digital ocean k8s, I had to do step 5 (https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes), if you are using another cluster service, this step can be skipped.

9. Modify the ingress file to use the certificate issuer created in step 7 above

NB: https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes#step-6-issuing-staging-and-production-let-s-encrypt-certificates

    

